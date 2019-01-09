/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllProducts} from './all-products'
export {default as Product} from './product'
/**
 * export all the exports received from the components
 * tests do not work with connected default components
 * and need dumb component
 */
// export * from './navbar'
// export * from './user-home'
// export * from './all-products'
// export * from './product'

export {Login, Signup} from './auth-form'
