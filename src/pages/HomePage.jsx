import React from 'react'
import "../app.css"
import { Container, Box, Text, TabList, Tab, Tabs, TabPanels, TabPanel} from "@chakra-ui/react"
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'


const HomePage = () => {
  return (
    <div className='app'>
      <Container>
        <Box display="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius={"lg"} borderWidth={"1px"} >
          <Text fontSize={'4xl'} color={"black"}>Talk-A-Tive</Text>
        </Box>
        <Box bg="white" w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"}>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
      </Container>
    </div>
  )
}

export default HomePage