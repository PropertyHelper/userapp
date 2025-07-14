import { useEffect, useState } from "react"
import {
    Box,
    Heading,
    Text,
    Spinner,
    Divider,
    VStack,
    Flex,
} from "@chakra-ui/react"

export const Home = function () {
    const [profile, setProfile] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt")
                const headers = { token }

                const profileRes = await fetch(`http://10.128.55.69:8002/user/`, { headers })
                if (!profileRes.ok) throw new Error("Failed to fetch user profile")
                const profileData = await profileRes.json()

                const txRes = await fetch(`http://10.128.55.69:8002/user/transactions`, { headers })
                if (!txRes.ok) throw new Error("Failed to fetch transactions")
                const txData = await txRes.json()

                const shopBalRes = await fetch(`http://10.128.55.69:8002/user/balance`, { headers })
                if (!shopBalRes.ok) throw new Error("Failed to fetch shop balances")
                const shopBalData = await shopBalRes.json()

                setProfile(profileData)
                setTransactions(txData.transactions || [])
                setShops(shopBalData.shops || [])
            } catch (err) {
                console.error("Failed to fetch home data", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Spinner size="xl" mt="100px" mx="auto" display="block" />
    if (!profile) return <Text>Error loading data</Text>

    return (
        <Flex maxW="1200px" mx="auto" mt="50px" px={4} gap={8} align="flex-start">
            {/* LEFT: Shop Balances */}
            <Box flex="1" minW="200px">
                <Heading size="md" mb={4}>Shop Balances</Heading>
                <VStack spacing={4} align="stretch">
                    {shops.length === 0 ? (
                        <Text>No shops found.</Text>
                    ) : (
                        shops.map(([name, balance], idx) => (
                            <Box key={idx} borderWidth="1px" borderRadius="md" p={3}>
                                <Text fontWeight="bold">{name ?? 'Unknown Shop'}</Text>
                                <Text>Balance: {balance ?? 0}</Text>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>

            {/* RIGHT: Profile + Transactions */}
            <Box flex="3">
                <Heading mb={4}>Profile Info</Heading>
                <Text><strong>Email:</strong> {profile.email}</Text>
                <Text><strong>Username:</strong> {profile.user_name}</Text>
                <Text><strong>Date of Birth:</strong> {profile.date_of_birth}</Text>
                <Text><strong>Gender:</strong> {profile.gender}</Text>
                <Text><strong>Nationality:</strong> {profile.nationality}</Text>

                <Divider my={6} />

                <Heading size="md" mb={3}>Transaction History</Heading>
                <VStack spacing={4} align="stretch">
                    {transactions.length === 0 ? (
                        <Text>No transactions found.</Text>
                    ) : (
                        transactions.map((tx) => (
                            <Box key={tx.tid} borderWidth="1px" borderRadius="md" p={4}>
                                <Text><strong>Shop:</strong> {tx.shop_name ?? 'N/A'}</Text>
                                <Text><strong>Date:</strong> {new Date(tx.performed_at).toLocaleDateString()}</Text>
                                <Text><strong>Total Cost:</strong> ${tx.total_cost}</Text>
                                <Text><strong>Points Allocated:</strong> {tx.points_allocated}</Text>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>
        </Flex>
    )
}