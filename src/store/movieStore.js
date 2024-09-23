import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useMovieStore = defineStore('movieStore', () => {

  const getPopulars = async () => {
    try { 
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?&page=1&api_key=6a81fe8bf742382e2978ccde3e88097f')
      return response.data.results
    } catch (error) {}
  }

  const getCartoons = async () => {
    try { 
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=6a81fe8bf742382e2978ccde3e88097f&language=en-US&sort_by=release_date.desc&page=1&with_genres=16')
      return response.data.results
    } catch (error) {}
  }

  const findMovie = async (search) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=6a81fe8bf742382e2978ccde3e88097f`)
      return response.data.results
    } catch (error) {}
  }

  const fetchMovie = async (id) => {
    try {
      const response = await axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=6a81fe8bf742382e2978ccde3e88097f`)
      console.log('MOVIE:', response.data)
      return response.data
    } catch (error) {}
  }

  return { getPopulars, getCartoons, findMovie, fetchMovie }
})