export class CustomerRecordedEvent {
  constructor(
    public firstName: string,
    public lastName: string,
    public emailAddress: string
  ) {}
}

export class CustomerDataChangedEvent {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public emailAddress?: string
  ) {}
}

export class CustomerRemovedEvent {
  constructor() {}
}
