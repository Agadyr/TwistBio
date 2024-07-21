import { useEffect, useState } from 'react'

import { Link, useRouter } from '@tanstack/react-router'

import './Header.scss'

export default function Header() {
  const { state } = useRouter()
  const [pathName, setPathName] = useState(false)
  useEffect(() => {
    if (state.location.pathname === '/allcomparison' || state.matches[1].routeId === '/$compId/about') {
      setPathName(true)
    } else if (state.location.pathname === '/adminusers') {
      setPathName(false)
    }
  }, [state])
  return (
    <header>
      <section className="container header-container">
        <Link>
          <div
            style={{
              color: pathName ? '#9449CE' : '#606A75',
            }}
          >
            Сравнения
          </div>
        </Link>
        <Link>
          <div
            style={{
              color: !pathName ? '#9449CE' : '#606A75',
            }}
          >
            Пользователи
          </div>
        </Link>
      </section>
    </header>
  )
}
