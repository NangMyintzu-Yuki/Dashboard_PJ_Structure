export const ApiService = {
  auth: {
    operator: {
      login: 'api/operator/login',
      logout: 'api/operator/logout'
    }
  },
  role : {
    list : 'api/role'
  },
  branch: {
    list: 'api/branch',
    create : 'api/branch/store',
    update: 'api/branch/update',
    edit : 'api/branch/edit',
    delete: 'api/branch/delete',
    filter: 'api/branch/filter'
  },
  operator: {
    list : 'api/operator',
    create : 'api/operator/store',
    update : 'api/operator/update',
    edit : "api/operator/edit",
    delete : 'api/operator/delete',
    filter: 'api/operator/filter',
    change_password : '/api/operator/change_password'
  }
}