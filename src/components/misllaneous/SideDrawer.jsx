import { Avatar, Box, Button, Drawer, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { ChatState } from '../../context/chatProvider'
import ProfielModal from './ProfielModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'

const SideDrawer = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [laodingChat, setLoadingChat] = useState()
  const navigate = useNavigate()
  const toast = useToast()

  const { user, setSelectedChat , chats, setChats} = ChatState()

  const logouttHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async () => {
    if(!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
      return 
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`/api/users?search=${search}`, config)

      // console.log(data)

      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the search Results",
        error: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)

      const config ={
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post("/api/chat", { userId }, config)

      if(!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats])
      }

      setSelectedChat(data)
      setLoading(false)
      onClose()
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} bg={"white"} w={"100%"} p={"5px 10px 5px 10px"} borderWidth={"5px"}>
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} onClick={onOpen}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text display={{base:"none", md: "flex"}} p={"4"}>
            Search User
          </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily={"Work sans"}>
          Chat-App
        </Text>
        <div>
          <Menu>
            <MenuButton padding={1}>
              <BellIcon fontSize={"2xl"} m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfielModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfielModal>
              <MenuDivider/>
              <MenuItem onClick={logouttHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input placeholder={"Search by name or email"} mr={2} value={search} onChange={(e) => setSearch(e.target.value)}/>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            { loading ? (<ChatLoading/>) : (
              searchResult?.map(user => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)}/>
              ))
            )}
            { laodingChat && <Spinner ml={"auto"} display={"flex"}/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer