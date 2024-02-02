import { CropsTypes } from '../../core/enum/crops-types';

export interface IFarm {
  name: string;
  ownerId: string;
  city: string;
  state: string;
  arable_area: number;
  total_area: number;
  crops_types: string[];
  vegetation_area: number;
}
