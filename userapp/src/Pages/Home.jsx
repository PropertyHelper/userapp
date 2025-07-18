import { useEffect, useState } from "react" //React hooks for lifecycle and state
import {
    Box,
    Heading,
    Text,
    Spinner,
    Divider,
    VStack,
    Flex,
} from "@chakra-ui/react" //Chakra UI components for styling/layout
import {BASE_API} from "../api.js"; //Base API URL constant

//Home component: Fetches and displays user profile, shop balances, and transactions
export const Home = function () {
    //State hooks to manage profile, transactions, shop balances, and loading status
    const [profile, setProfile] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)

    //Effect hook to fetch data on initial mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt") //Get JWT token from localStorage
                const headers = { token }

                //Fetch user profile data
                const profileRes = await fetch(BASE_API + `/user/`, { headers })
                if (!profileRes.ok) throw new Error("Failed to fetch user profile")
                const profileData = await profileRes.json()

                //Fetch user transactions
                const txRes = await fetch(BASE_API + `/user/transactions`, { headers })
                if (!txRes.ok) throw new Error("Failed to fetch transactions")
                const txData = await txRes.json()

                //Fetch shop balances
                const shopBalRes = await fetch(BASE_API + `/user/balance`, { headers })
                if (!shopBalRes.ok) throw new Error("Failed to fetch shop balances")
                const shopBalData = await shopBalRes.json()

                //Update state with fetched data
                setProfile(profileData)
                setTransactions(txData.transactions || [])
                setShops(shopBalData.shops || [])
            } catch (err) {
                //Log any fetch errors
                console.error("Failed to fetch home data", err)
            } finally {
                //Set loading to false regardless of success/failure
                setLoading(false)
            }
        }

        fetchData() //Trigger data fetch
    }, []) //Empty dependency array ensures this runs only once

    //Conditional rendering: Show spinner while loading
    if (loading) return <Spinner size="xl" mt="100px" mx="auto" display="block" />
    //Show error message if profile data not available
    if (!profile) return <Text>Error loading data</Text>

    return (
        <Flex maxW="1200px" mx="auto" mt="50px" px={4} gap={8} align="flex-start">
            {/* LEFT: Shop Balances */}
            <Box flex="1" minW="200px">
                <Heading size="md" mb={4}>Shop Balances</Heading>
                <VStack spacing={4} align="stretch">
                    {/* Show message if no shop data */}
                    {shops.length === 0 ? (
                        <Text>No shops found.</Text>
                    ) : (
                        //Map shop entries to individual boxes
                        shops.map(([name, balance], idx) => (
                            <Box key={idx} borderWidth="1px" borderRadius="md" p={3}>
                                <Text fontWeight="bold">{name ?? 'Unknown Shop'}</Text>
                                <Text>Balance: {balance ? balance / 100 : 0} Points</Text>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>

            {/* RIGHT: Profile + Transactions */}
            <Box flex="3">
                <Heading mb={4}>Profile Info</Heading>
                {/* Display profile details */}
                <Text><strong>Email:</strong> {profile.email}</Text>
                <Text><strong>Username:</strong> {profile.user_name}</Text>
                <Text><strong>Date of Birth:</strong> {profile.date_of_birth}</Text>
                <Text><strong>Gender:</strong> {profile.gender}</Text>
                <Text><strong>Nationality:</strong> {profile.nationality}</Text>

                <Divider my={6} />

                <Heading size="md" mb={3}>Transaction History</Heading>
                <VStack spacing={4} align="stretch">
                    {/* Show message if no transactions */}
                    {transactions.length === 0 ? (
                        <Text>No transactions found.</Text>
                    ) : (
                        //Map transactions to styled boxes
                        transactions.map((tx) => (
                            <Box key={tx.tid} borderWidth="1px" borderRadius="md" p={4}>
                                <Text><strong>Shop:</strong> {tx.shop_name ?? 'N/A'}</Text>
                                <Text><strong>Date:</strong> {new Date(tx.performed_at).toLocaleDateString()}</Text>
                                <Text><strong>Total Cost:</strong> {tx.total_cost / 100} AED</Text>
                                <Text><strong>Points Allocated:</strong> {tx.points_allocated / 100}</Text>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>
        </Flex>
    )
}