import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, UserDto } from '../api';
import { compareUrl } from '../utils/compareUrl';

type Breadcrumb = {
  title: string;
  url: string | false;
};

type Route = {
  icon: string;
  title: string;
  url: string;
  visible: boolean;
  roles?: roles[];
  breadcrumb?: Breadcrumb[];
};

enum roles {
  admin = "admin",
  seller = "seller",
  inventoryManager = "invmanager"
}

type Button = {
  title: string;
  action?: Function;
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  routes: Route[] = [
    {
      icon: 'fa fa-file',
      title: 'Nueva Factura',
      url: '/invoicing/invoices/new',
      visible: false,
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/invoicing',
        },
        {
          title: 'Listado Facturas',
          url: '/invoicing/invoices',
        },
        {
          title: 'Nueva Factura',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-file',
      title: 'Detalle de Factura',
      url: '/invoicing/invoices/:id',
      visible: false,
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/invoicing',
        },
        {
          title: 'Listado Facturas',
          url: '/invoicing/invoices',
        },
        {
          title: 'Visualizar Factura',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-home',
      title: 'Dashboard',
      url: '/home',
      roles: [roles.seller, roles.admin, roles.inventoryManager],
      visible: true,
      breadcrumb: [
        {
          title: 'Inicio',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-list',
      title: 'Listado de Facturas',
      visible: true,
      roles: [roles.seller],
      url: '/invoicing/invoices',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/invoicing',
        },
        {
          title: 'Listado Facturas',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-credit-card',
      title: 'Listado de Compras',
      visible: true,
      roles: [roles.inventoryManager],
      url: '/invoicing/purchases',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/admin',
        },
        {
          title: 'Compras',

          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-box',
      title: 'Productos',
      visible: true,
      roles: [roles.inventoryManager],
      url: '/inventory/products',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/inventory',
        },
        {
          title: 'Productos',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-hand-holding-heart',
      title: 'Servicios',
      visible: true,
      roles: [roles.inventoryManager],
      url: '/inventory/services',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/inventory',
        },
        {
          title: 'Servicios',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-tags',
      title: 'Categorías de Productos',
      visible: true,
      roles: [roles.inventoryManager],
      url: '/inventory/categories',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/inventory',
        },
        {
          title: 'Categorías',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-landmark',
      title: 'Catálogo de Sucursales',
      roles: [roles.admin],
      visible: true,
      url: '/admin/branch',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/admin',
        },
        {
          title: 'Sucursales',

          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-truck',
      title: 'Proveedores',
      url: '/admin/supplier',
      visible: true,
      roles: [roles.inventoryManager],
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/admin',
        },
        {
          title: 'Proveedores',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-user',
      title: 'Usuarios del Sistema',
      roles: [roles.admin],
      visible: true,
      url: '/admin/user',
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/admin',
        },
        {
          title: 'Usuarios',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-cog',
      visible: true,
      title: 'Configuración de la Cuenta',
      url: '/admin/setting',
      roles: [roles.seller, roles.admin, roles.inventoryManager],
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/admin',
        },
        {
          title: 'Configuración',
          url: false,
        },
      ],
    },
    {
      icon: 'fa fa-info',
      visible: true,
      title: 'Ayuda',
      url: '/home/faq',
      roles: [roles.seller, roles.admin, roles.inventoryManager],
      breadcrumb: [
        {
          title: 'Inicio',
          url: '/home'
        },
        {
          title: 'Ayuda',
          url: false
        },
      ],
    },
  ];

  availableRoutes: Route[] = []
  isStickyHeader: boolean;
  animateHeader: boolean = false;
  isAsideVisible = false;

  currentRoute: Route;

  userRoles: string[];

  user: UserDto;

  newButton: Button = {
    title: '',
  };

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const isStickyHeader = window.scrollY > 90;
    if (isStickyHeader === this.isStickyHeader) return;

    this.animateHeader = isStickyHeader;
    this.isStickyHeader = isStickyHeader;
  }

  constructor(private router: Router, private authService: AuthService) {
    this.userRoles = authService.currentUser.user.roles.map(x => x.roleId);
    this.availableRoutes = this.routes.filter(route => route.roles?.some(y => this.userRoles.includes(y)));
    this.user = this.authService.currentUser.user;
  }

  toogleAside() {
    this.isAsideVisible = !this.isAsideVisible;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.updateCurrentRoute(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.updateCurrentRoute(event.url);
    });
  }

  updateCurrentRoute(url: string) {
    this.isAsideVisible = false;
    this.currentRoute = this.routes.find((x) => compareUrl(x.url, url));
  }

  logout() {

    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
