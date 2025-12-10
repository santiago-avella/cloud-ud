import { Injectable } from '@nestjs/common';
import { AwsBucketS3 } from './providers/aws-bucket.provide';

@Injectable()
export class BucketS3Service {
    constructor(
        private readonly awsBucketS3: AwsBucketS3
    ){}

    public async uploadFile(file: Express.Multer.File){
        return this.awsBucketS3.uploadFileBucket(file)
    }
}
