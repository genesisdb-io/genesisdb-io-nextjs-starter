import { CloudEvent } from "cloudevents";

export default function Events({ customerEvents }: { customerEvents: CloudEvent<unknown>[] }) {

  if (!customerEvents || customerEvents.length === 0) {
    return <pre className="text-xs">No events written yet</pre>;
  }

  return (
    <div>
      <pre className="text-xs">{JSON.stringify(customerEvents, null, 2)}</pre>
    </div>
  );
}
