import React from 'react';
import ProfileUi from 'react-profile-card';
 
 
function Example({name,img}) {
  return (
    <div> 
      <ProfileUi 
          imgUrl={img} 
          name={name} 
          designation='NITP'
          />
    </div>
  );
}
 
export default Example;