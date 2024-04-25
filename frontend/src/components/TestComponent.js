import React from 'react';
import { useHeaders } from './useHeaders';

function TestComponent() {
  const [headers, setHeaders] = useHeaders();
  return (
    <div>
      {headers.length > 0 ? headers.map(header => <p>{header}</p>) : <p>No headers set</p>}
    </div>
  );
}
export default TestComponent;
