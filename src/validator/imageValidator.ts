import { bytesToMb } from "@/lib/utils";

export const imageValidator = (name: string | undefined, size: number | undefined): string | null => {
    let flag: string | null = null;

    if (name) {
        const getImgExt = name.split('.')
        const imageExtTypes: Array<string> = ['svg', 'png', 'jpg', 'jpeg', 'gif'];

        if (!imageExtTypes.includes(getImgExt[1])) {
            flag = "Image must be .png, .jpeg, .jpg, .svc, .gif"
        }
        else {
            flag = null;
        }
    }
    else if (size) {
        const fileInMb = bytesToMb(size);

        if (fileInMb > 2) {
            flag = 'Image should be less than 2 MB.'
        }
        else {
            flag = null
        }
    }

    return flag
}