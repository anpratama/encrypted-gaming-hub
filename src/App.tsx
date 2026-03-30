import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import HiddenHandsPage from './pages/HiddenHandsPage'
import SecretBidsPage from './pages/SecretBidsPage'
import DicePage from './pages/DicePage'

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ background: '#050510', minHeight: '100vh' }}>
      <Navbar />
      <Outlet />
    </div>
  ),
})

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const gamesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/games', component: GamesPage })
const hiddenHandsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/games/hidden-hands', component: HiddenHandsPage })
const secretBidsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/games/secret-bids', component: SecretBidsPage })
const diceRoute = createRoute({ getParentRoute: () => rootRoute, path: '/games/provably-fair-dice', component: DicePage })

const routeTree = rootRoute.addChildren([indexRoute, gamesRoute, hiddenHandsRoute, secretBidsRoute, diceRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

export default function App() {
  return <RouterProvider router={router} />
}
