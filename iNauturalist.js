import fetch from "node-fetch"

const baseUrl = "https://api.inaturalist.org/v1/"

const taxaPath = "taxa"

const observationPath = "observations/histogram"

const queryParams = "1"

const API_URL = baseUrl + taxaPath + queryParams

export const main = async () => {
  const taxas = [1, 2, 3, 4, 5, 6, 7]

  const fetchTaxas = (taxa) => fetch(baseUrl + taxaPath + taxa)

  await taxas.reduce(async (prev, t) => {
    const taxaData = await fetchTaxas(t)
    const taxaResponse = await taxaData.json()
    const r = (await prev) + 1
    console.log(
      taxaResponse.results.map((r) => ({
        name: r.name,
        id: t,
      })),
    )
    return r
  }, Promise.resolve(0))
}

const fetchObservation = (id) => fetch(baseUrl + observationPath + id)

const fetchObservations = ({ taxon_id, place_id }) => {
  const paramsObj = {
    ...(taxon_id && taxon_id),
    place_id,
    page: 1,
    per_page: 1000,
  }
  const searchParams = new URLSearchParams(paramsObj)

  console.log(searchParams.toString())

  return fetch(baseUrl + observationPath + "?" + searchParams.toString())
}

const fetchObservationsHistogram = ({ place_id, taxon_id }) => {
  const paramsObj = {
    place_id,
    taxon_id,
  }
  const searchParams = new URLSearchParams(paramsObj)

  return fetch(baseUrl + observationPath + "?" + searchParams.toString())
}

const Places = {
  Chile: 7182,
}

const Taxon = {
  Thomisidae: 47866,
}

const getObservation = async () => {
  const res = await fetchObservationsHistogram({
    place_id: Places.Chile,
    taxon_id: Taxon.Thomisidae,
  })
  const data = await res.json()
  // console.log(data.results.month_of_year["1"])
  console.log(data.results)
}

getObservation()
