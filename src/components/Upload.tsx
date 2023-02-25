import { ReactComponent as UploadIcon } from "../assets/icons/upload.svg";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import Card from "./Card";
import { useState } from "react";
import { data } from "../libs/types";

interface props {
    setFields: (value: data | null) => void;
    fields: data | null;
}

const Upload = ({ fields, setFields }: props) => {
    const [image, setImage] = useState("");

    // the upload implementation wasn't clear to me so i went with this simple approche
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event?.target?.files?.[0];
        let imgUrl;
        if (imageFile && imageFile.size <= 1000000) {
            imgUrl = URL.createObjectURL(imageFile);
            setImage(imgUrl);
            if (!fields) return;
            setFields({
                ...fields,
                attributes: {
                    ...fields?.attributes,
                    coverImage: imgUrl,
                },
            });
        }
    };

    return !image ? (
        <Card title="Upload cover image">
            <div className="aspect-[256/105] gap-2 text-center flex flex-col justify-center rounded-[5px] items-center border border-dashed border-black relative hover:bg-[#D0F7FA] py-3">
                <input type="file" className="absolute opacity-0 inset-0 z-10 cursor-pointer" onChange={handleImageChange} />
                <UploadIcon />
                <div className="font-semibold text-sm">Upload cover image</div>
                <div className="font-semibold text-[#979797] text-sm">16:9 ratio is recommended. Max image size 1mb</div>
            </div>
        </Card>
    ) : (
        <div className=" rounded-[20px] overflow-hidden shadow-[3px_3px_14px_rgba(190,190,190,0.3)]">
            <img className=" w-full aspect-[119/64] object-cover " src={image} />

            <button className="w-full text-[#A80000] flex items-center gap-2 p-3" onClick={() => setImage("")}>
                <Delete />
                <span className="text-[#A80000] text-sm font-semibold">Delete & re-upload</span>
            </button>
        </div>
    );
};

export default Upload;
