/** @format COMPONENTS */

import { useSelector } from 'react-redux';

export const RequestStatus = () => {
  
  const status = useSelector((state) => {
    return state.status;
  });

  console.log("status: ", status)
  return <div className="request-status">{status}</div>;
};
