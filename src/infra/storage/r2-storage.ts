import { randomUUID } from "node:crypto";
import { Uploader, UploadParams } from "@/domain/forum/application/storage/uploader";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { EnvService } from "../auth/env/env.services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;
  
  constructor(private envService: EnvService) {
    const accountId = envService.get('CLOUDFLARE_ACCOUNT_ID')

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      }
    })
  }

  async upload({fileName, fileType, body}: UploadParams): Promise<{ url: string }> {
   const uploadId = randomUUID()

   const uniqueFileName = `${uploadId}-${fileName}` // Nome único do arquivo com UUID

   await this.client.send(new PutObjectCommand({
    Bucket: this.envService.get('AWS_BUCKET_NAME'), // Nome do bucket
    Key: uniqueFileName, // Nome do arquivo no bucket
    ContentType: fileType, // Tipo do arquivo
    Body: body, // Conteúdo do arquivo
   }))

   return { url: uniqueFileName }
  }
}