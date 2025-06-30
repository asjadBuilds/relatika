import { getUserSpaces } from "@/api/spaceApi"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@radix-ui/react-avatar';
import { Space } from "@/models/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { schema } from "@/models/createPostForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button } from "@mantine/core";
import { createPost } from "@/api/postApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
type createPostForm = z.infer<typeof schema>;
const CreatePost = () => {
  const navigate = useNavigate();
  const { data: userSpaces } = useQuery<Space[]>({
    queryKey: ['getUserSpaces'],
    queryFn: getUserSpaces,
  })
  const mutation = useMutation({
    mutationFn: createPost,
    onError: (error: any) => {
      toast.error(error?.response?.data?.error);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      reset();
      navigate('/')
    }
  })
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<createPostForm>({
    resolver: zodResolver(schema)
  })
  const onSubmit = (values: createPostForm) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('spaceId', values.spaceId);
    if (values.gallery && values.gallery.length > 0) {
      values?.gallery.forEach((item) => formData.append('gallery', item));
    } else {
      formData.append('gallery', '');
    }
    mutation.mutate(formData)
  }


  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML());
    }
  });
  const handleImages = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setValue('gallery', fileArray);
    } else {
      setValue('gallery', []);
    }
  }
  return (
    <div className="flex flex-col justify-start p-4 gap-4">
      <h2 className="text-3xl text-white font-semibold">Create Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
        <Select onValueChange={(value) => setValue('spaceId', value)} defaultValue="0">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Space" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Select Space</SelectItem>
            {userSpaces?.map((space: any, index: any) => (
              <SelectItem key={index} value={space?.spaceId._id} className="flex gap-3 items-center p-4">
                <Avatar>
                  <AvatarImage src={space?.spaceId?.avatar} className="w-6" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <span className="text-sm">{space?.spaceId.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.spaceId && <p className='text-red-500 self-start'>{errors.spaceId.message}</p>}
        <div>
          <Label className="text-sm font-semibold">Title</Label>
          <Input {...register('title')} placeholder="*Title" className="mt-2"/>
          {errors.title && <p className='text-red-500 self-start'>{errors.title.message}</p>}
        </div>
        <div>
          <Label>Content</Label>
          <div className="w-full border border-gray-300 rounded-lg p-2 mt-2">
            <RichTextEditor editor={editor} className="bg-neutral-800">
              <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)" bg={'dark'}>
                <RichTextEditor.ControlsGroup >
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content bg={'#262626'} className="h-[240px]"/>
            </RichTextEditor>
          </div>
          {errors.content && <p className='text-red-500 self-start'>{errors.content.message}</p>}
        </div>
        <div>
          <Label>Images to upload</Label>
          <Input onChange={(e) => handleImages(e.target.files)} type="file" multiple className="mt-2 file:text-white" />
          {errors.gallery && <p className='text-red-500 self-start'>{errors.gallery.message}</p>}
        </div>
        <Button type='submit' className='!bg-blue-500 hover:!bg-blue-600 border-none !text-white transition-colors duration-200 w-full'>Create Post</Button>
      </form>

    </div>
  )
}

export default CreatePost