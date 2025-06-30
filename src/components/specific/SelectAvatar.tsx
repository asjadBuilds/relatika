import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { lorelei } from '@dicebear/collection';
import { adventurer } from '@dicebear/collection';
import { avataaars } from '@dicebear/collection';
import { seeds } from '@/utils/helpers';
import { createAvatar } from '@dicebear/core';

type SelectAvatarProps = {
    selectedAvatar: string;
    setValue: any;
    errors: { avatar?: { message?: string } };
};

const SelectAvatar = ({ selectedAvatar, setValue, errors }: SelectAvatarProps) => {
    const loreleiAvatars = seeds.map(seed => {
        const avatar = createAvatar(lorelei, { seed });
        return avatar.toString();
    });
    const adventurerAvatars = seeds.map(seed => {
        const avatar = createAvatar(adventurer, { seed });
        return avatar.toString();
    });
    const avataaarsAvatars = seeds.map(seed => {
        const avatar = createAvatar(avataaars, { seed });
        return avatar.toString();
    });
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'} className='bg-blue-500 self-start'>Select Avatar</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Your Avatar</DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="lorelei">lorelei</TabsTrigger>
                            <TabsTrigger value="adventurer">adventurer</TabsTrigger>
                            <TabsTrigger value="avataaars">avataaars</TabsTrigger>
                        </TabsList>
                        <TabsContent value="lorelei">
                            <div className='flex flex-wrap gap-3 max-h-80 overflow-y-auto'>
                                {loreleiAvatars.map((svg, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: svg }} className={`w-[100px] h-[100px] border-4 ${selectedAvatar === svg ? " border-blue-500" : "border-black"}`} onClick={() => setValue('avatar', svg, { shouldValidate: true })}>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="adventurer">
                            <div className='flex flex-wrap gap-3 max-h-80 overflow-y-auto'>
                                {adventurerAvatars.map((svg, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: svg }} className={`w-[100px] h-[100px] border-4 ${selectedAvatar === svg ? " border-blue-500" : "border-black"}`} onClick={() => setValue('avatar', svg, { shouldValidate: true })}>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="avataaars">
                            <div className='flex flex-wrap gap-3 max-h-80 overflow-y-auto'>
                                {avataaarsAvatars.map((svg, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: svg }} className={`w-[100px] h-[100px] border-4 ${selectedAvatar === svg ? " border-blue-500" : "border-black"}`} onClick={() => setValue('avatar', svg, { shouldValidate: true })}>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogClose asChild>
                        <Button className='mt-4 bg-blue-500' variant={'default'}>Confirm Avatar</Button>
                    </DialogClose>
                </DialogContent>

            </Dialog>
            {errors.avatar && <p className='text-red-500 self-start'>{errors.avatar.message}</p>}
        </div>
    )
}

export default SelectAvatar