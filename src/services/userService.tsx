export const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`)
    const data = await response.json()

    return data;
}