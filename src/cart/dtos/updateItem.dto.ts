import { PartialType } from '@nestjs/swagger';
import { ItemDTO } from './item.dto';

export class UpdateItemDto extends PartialType(ItemDTO) {}
