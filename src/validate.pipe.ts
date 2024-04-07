import { ArgumentMetadata, Injectable, PipeTransform,BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata',metadata);
    if(Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}只能是数字`)
    } 
    return typeof value === 'number' ? value * 10: parseInt(value) * 10;
  }
}
