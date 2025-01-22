import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal"
import useUser from "@/hooks/useUser"
import axios from "axios"

import {  useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Modal from "../Modal"
import Input from "../Input"





const EditModal = () => {

    const {data:currentUser } = useCurrentUser()
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')    
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {    
        setProfileImage(currentUser?.profileImage)    
        setCoverImage(currentUser?.coverImage)    
        setName(currentUser?.name)    
        setUsername(currentUser?.username)  
        setBio(currentUser?.bio)    
    }, [currentUser])


    const [isLoading, setIsLoading] = useState(false)   

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })

            mutateFetchedUser()

            toast.success('Updated')

            editModal.onClose()

        } catch (error) {
            console.log('Something went wrong')
        }
        finally {
            setIsLoading(false)
        }
    }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser])

    const bodyContent = (   
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
            
        </div>
    )
          

    return (
        <Modal
            body={bodyContent}
            onSubmit={onSubmit}
            actionLabel="Save"
            disabled={isLoading}
            title="Edit Profile"
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            // {/* <form onSubmit={onSubmit}>
            //     <div className="space-y-12">
            //         <div className="border-b border-gray-900/10 pb-12">
            //             <h2 className="text-base font-semibold leading-7 text-gray-900">
            //                 Profile
            //             </h2>
            //             <p className="mt-1 text-sm leading-6 text-gray-600">
            //                 Edit your public information
            //             </p>
            //             <div className="mt-10 flex flex-col gap-7">
            //                 <Input
            //                     disabled={isLoading}
            //                     onChange={(e) => setName(e.target.value)}
            //                     value={name}
            //                     id="name"
            //                     type="text"
            //                     label="Name"
            //                 />
            //                 <Input
            //                     disabled={isLoading}        
            //                     onChange={(e) => setUsername(e.target.value)}
            //                     value={username}
            //                     id="username"
            //                     type="text"
            //                     label="Username"
            //                 />
            //                 <Input
            //                     disabled={isLoading}
            //                     onChange={(e) => setBio(e.target.value)}
            //                     value={bio}
            //                     id="bio"
            //                     type="text"
            //                     label="Bio"
            //                 />
            //             </div>
            //         </div>
            //     </div>                

            //     <div className="mt-6 flex items-center justify-end gap-x-6">
            //         <Button
            //             disabled={isLoading}
            //             label="Cancel"
            //             onClick={editModal.onClose}
            //             secondary
            //         />
            //         <Button
            //             disabled={isLoading}
            //             label="Save"
            //             type="submit"
            //         />
            //     </div>
            // </form> */
        />
    )

}

export default EditModal