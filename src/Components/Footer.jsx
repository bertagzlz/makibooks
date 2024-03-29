import React from 'react';


export default function Footer() {
  return (
      <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
        <div className="container py-4 py-md-5 px-4 px-md-3">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <a className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/"
                 aria-label="Bootstrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2"
                     viewBox="0 0 118 94" role="img"><title>Bootstrap</title>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                        fill="currentColor"></path>
                </svg>
                <span className="fs-5">Bootstrap</span>
              </a>
              <ul className="list-unstyled small text-muted">
                <li className="mb-2">Designed and built with all the love in the world by the
                  <a
                    href="/micuenta/">Login</a> with the help of
                  <a
                    href="https://github.com/twbs/bootstrap/graphs/contributors">our contributors</a>.
                </li>
                <li className="mb-2">Code licensed <a href="" target="_blank"
                rel="license noopener">MIT</a>, docs <a
                    href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY
                  3.0</a>.
                </li>
                <li className="mb-2">Currently v5.2.3.</li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 offset-lg-1 mb-3">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/account/login">Entrar</a></li>
                <li className="mb-2"><a href="/account/register">Registro</a></li>
                <li className="mb-2"><a href="https://icons.getbootstrap.com/">Iconos</a></li>
                <li className="mb-2"><a href="https://themes.getbootstrap.com/">Temas</a></li>
                <li className="mb-2"><a href="https://blog.getbootstrap.com/">Blog</a></li>
                <li className="mb-2"><a href="https://cottonbureau.com/people/bootstrap">Eres una librería?</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5>Guías</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/docs/5.2/getting-started/">Te ayudamos</a></li>
                <li className="mb-2"><a href="/docs/5.2/examples/starter-template/">Ayuda</a></li>
                <li className="mb-2"><a href="/docs/5.2/getting-started/webpack/">Servicio al cliente</a></li>
                <li className="mb-2"><a href="/docs/5.2/getting-started/parcel/">Parcel</a></li>
                <li className="mb-2"><a href="/docs/5.2/getting-started/vite/">Vite</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5>Proyectos</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="https://github.com/twbs/bootstrap">Bootstrap 5</a></li>
                <li className="mb-2"><a href="https://github.com/twbs/bootstrap/tree/v4-dev">Bootstrap 4</a></li>
                <li className="mb-2"><a href="https://github.com/twbs/icons">Icons</a></li>
                <li className="mb-2"><a href="https://github.com/twbs/rfs">RFS</a></li>
                <li className="mb-2"><a href="https://github.com/twbs/bootstrap-npm-starter">npm starter</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5>Communidad</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="https://github.com/twbs/bootstrap/issues">Issues</a></li>
                <li className="mb-2"><a href="https://github.com/twbs/bootstrap/discussions">Discussions</a></li>
                <li className="mb-2"><a href="https://github.com/sponsors/twbs">Corporate sponsors</a></li>
                <li className="mb-2"><a href="https://opencollective.com/bootstrap">Open Collective</a></li>
                <li className="mb-2"><a href="https://stackoverflow.com/questions/tagged/bootstrap-5">Stack Overflow</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

  );
}
