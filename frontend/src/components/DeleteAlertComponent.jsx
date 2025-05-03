import React from 'react'

export const DeleteAlertComponent = ({onCancel,deleteFunction,showBox,message}) => {
  return (
    <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: showBox?'flex':'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000'
      }}>
     
        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          width: '300px'
        }}>
          {/* <MdWarning size={40} color="orange" /> */}
          <h3 className='text-red font-bold '>{message}</h3>
          <div style={{ marginTop: '20px' }}>
            <button className='bg-red-700 rounded text-white px-6 py-1 cursor-pointer' onClick={()=>{deleteFunction()}} style={{ marginRight: '10px' }}>Yes</button>
            <button className='bg-blue-700 rounded text-white px-6 py-1 cursor-pointer' onClick={()=>{onCancel()}}>Cancel</button>
          </div>
        </div>
      </div>
  )
}
