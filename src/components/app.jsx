import { Component } from 'react'
import logo from '../assets/logo.png'

/**
 * Root application shell.
 *
 * Deliberately bare for now — this is scaffolding, not the product UI. Uses Optics'
 * default `op-page` / `navbar` layout components as-is; the real interface (county
 * entry, the E-500/E-536 grids, disclaimers) has not had its design pass yet. See
 * dev_notes/ROADMAP.md.
 */
export class App extends Component {
  render() {
    return (
      <div className="op-page">
        <div className="op-page__main">
          <header className="op-page__main-header navbar navbar--primary">
            <div className="navbar__brand">
              <img src={logo} alt="Abacus" />
            </div>
          </header>

          <main className="op-page__main-content">
            <h1 className="app__title">Abacus</h1>
            <p className="app__tagline">NC sales tax, split by county.</p>
          </main>
        </div>
      </div>
    )
  }
}
