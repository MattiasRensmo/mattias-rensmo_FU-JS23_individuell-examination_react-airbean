import { useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Something went wrong =(')
        }
        // console.log(await response)
        const fetchedData = await response.json()
        setData(fetchedData)
        setLoading(false)
        //TODO Här borde jag bli bättre på att hitta alla sorters fel
        //TODO Kanke en trevlig log över alla error
      } catch (error) {
        if (error instanceof Error) setError(error)
        console.log(error instanceof Error, error)

        setLoading(false)
      }
    }

    fetchData()

    //Handle component unload
    return () => {
      //TODO abort handler
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
