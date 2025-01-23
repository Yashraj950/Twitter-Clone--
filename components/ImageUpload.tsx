import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";



interface ImageUploadProps {
    value: string;      
    disabled: boolean;
     label: string;
    onChange: (base64: string) => void;

}
const ImageUpload : React.FC<ImageUploadProps> = ({
    onChange,
    value,
    disabled,
    label
}) => {
    const [base64, setBase64] = useState()

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleChange])

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled : disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })
        


    return (
 <div {...getRootProps({

    className: 'w-full p-4 border-2 border-dashed border-neutral-300 flex flex-col justify-center items-center gap-2 cursor-pointer hover:opacity-70 transition'
 })} >
     <input {...getInputProps()} />

     {
        base64 ? (
            <div className="flex items-center justify-center gap-4" >
                  <Image src={base64} width={100} height={100}
                  alt="Uploaded image" />  

            </div>
        ) : (
            <p className="text-neutral-600" >{label}</p>
        )
     }
    
 </div>
    )   
}   

export default ImageUpload
