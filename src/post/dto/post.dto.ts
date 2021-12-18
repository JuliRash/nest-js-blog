export class CreatePostDto {
  title: string;
  body: string;
  status: Status;
}

export enum Status {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'INPROGRESS',
}
