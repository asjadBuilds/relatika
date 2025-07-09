import { createSpace } from "@/api/spaceApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import schema from "@/models/createSpaceForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod";
type createSpaceForm = z.infer<typeof schema>
const CreateSpace = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    setValue
  } = useForm<createSpaceForm>({
    resolver:zodResolver(schema),
    defaultValues: {
      name: "",
      avatar: undefined,
      description: "",
      rules: [{ title: "", content: "" }],
    },
  })
  const {mutate} = useMutation({
    mutationFn: createSpace,
    onSuccess:(response)=>{
      toast.success(response.message);
      navigate('/')
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });
  const onSubmit = (values:any)=>{
    const formData = new FormData();
    formData.append('name',values.name);
    formData.append('avatar',values.avatar);
    formData.append('description',values.description);
    formData.append('rules',JSON.stringify(values.rules) )
    mutate(formData)
  }
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    if (e && e.target && e.target.files && e.target.files[0]) {
      setValue('avatar', e.target.files[0]);
    }
  }
  return (
    <div className=" text-white m-4 p-4 rounded-xl bg-neutral-800">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start gap-3">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input {...register('name')} placeholder="Name of Space" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Avatar</Label>
        <Input onChange={(e)=>handleAvatarChange(e)} type="file" className="file:text-white"/>
        {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea {...register('description')}/>
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Rules</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 space-y-2 border p-4 rounded">
            <Input
              type="text"
              {...register(`rules.${index}.title`)}
              placeholder="Rule Title"
              className="border p-2 w-full"
            />
            {errors.rules?.[index]?.title && (
              <p className="text-red-500">
                {errors.rules[index]?.title?.message}
              </p>
            )}
            <Textarea
              {...register(`rules.${index}.content`)}
              placeholder="Rule Content"
              className="border p-2 w-full"
            />
            {errors.rules?.[index]?.content && (
              <p className="text-red-500">
                {errors.rules[index]?.content?.message}
              </p>
            )}
            {index > 0 && (
              <Button
                type="button"
                className="text-red-500 mt-2"
                onClick={() => remove(index)}
              >
                Remove Rule
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ title: "", content: "" })}
          className="bg-blue-500"
        >
          + Add another rule
        </Button>
      </div>
      <Button type="submit" className="bg-blue-500 w-full">
        Create Space
      </Button>
      </form>
    </div>
  )
}

export default CreateSpace