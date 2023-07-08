import React from 'react'
import { ChatState } from '../context/chatProvider'
import SideDrawer from '../components/misllaneous/SideDrawer'
import { Box } from '@chakra-ui/react'
import MyChat from '../components/MyChat'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  
  const { user } = ChatState()

  return (
    <div className='chat' style={{width: "100%"}}>
      {user && <SideDrawer/>}

      <Box display="flex" justifyContent={"space-between"} width={"100%"} height={"91.5vh"} padding={"10px"} >
        {user && <MyChat/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatPage