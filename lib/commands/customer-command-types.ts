import { Command, SubjectCondition } from "cqrskit"
import { v4 as uuidv4 } from 'uuid'

export class CreateCustomerCommand implements Command {
  public readonly customerId: string

  constructor(
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    customerId?: string
  ) {
    // Generate UUID if not provided
    this.customerId = customerId || uuidv4()
  }

  getSubject(): string {
    return `/customer/${this.customerId}`
  }

  getSubjectCondition(): SubjectCondition {
    return SubjectCondition.NEW
  }
}

export class UpdateCustomerCommand implements Command {
  constructor(
    public customerId: string,
    public firstName?: string,
    public lastName?: string,
    public emailAddress?: string
  ) {}

  getSubject(): string {
    return `/customer/${this.customerId}`
  }

  getSubjectCondition(): SubjectCondition {
    return SubjectCondition.NONE // Don't check existence since we're using SourcingMode.NONE
  }
}

export class RemoveCustomerCommand implements Command {
  constructor(public customerId: string) {}

  getSubject(): string {
    return `/customer/${this.customerId}`
  }

  getSubjectCondition(): SubjectCondition {
    return SubjectCondition.NONE // Don't check existence since we're using SourcingMode.NONE
  }
}
