import { useRouter } from 'next/router'

export default function Page() {
    const router = useRouter()
    return <p>

        Post number: {router.query.slug} // 
        Pass data as props to see something or fetch things.
    </p>
}