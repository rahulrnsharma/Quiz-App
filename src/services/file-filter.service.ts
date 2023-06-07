import { BadRequestException, Injectable } from "@nestjs/common";
// import { IMG_MIME_TYPE, IMG_MIME_TYPE_ERROR } from "src/regex";

export class FileFilterService {
    constructor() {
    }
    static imagefileFilter() {
        return {
            fileFilter: (req: any, file: any, cb: any) => {
                // if (!IMG_MIME_TYPE.test(file.mimetype.toLowerCase()))
                //     cb(new BadRequestException(IMG_MIME_TYPE_ERROR), false);
                cb(null, true);
            }
        }
    }
}