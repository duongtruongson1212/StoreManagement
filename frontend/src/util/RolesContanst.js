export const PERMISSIONS = {
    // admin full roll
    // muốn chỉ định duy nhất admin có thể sử dụng 1 component => withAuthorization(UserComponent,'isAdmin',true);
    // không cần chỉ định các trường bên trong
    isAdmin: 'isAdmin',
    isInventory: {
        access_category: 'access_category',
        import_inventory: 'import_inventory',
        import_inventory_add: 'import_inventory_add',
        import_inventory_edit: 'import_inventory_edit',
        export_inventory: 'export_inventory',
        export_inventory_add: 'export_inventory_add',
        export_inventory_edit: 'export_inventory_edit',
        request_inventory: 'request_inventory',
        request_inventory_add: 'request_inventory_add',
        request_inventory_edit: 'request_inventory_edit',
        check_inventory: 'check_inventory',
        check_inventory_add: 'check_inventory_add',
        check_inventory_edit: 'check_inventory_edit'
    },
    isSaleAgent:{
        access_orders: 'access_orders',
        drug_store: 'drug_store',
        access_content: 'access_content',
        access_comment: 'access_comment',
        access_promotion: 'access_promotion',
        access_customer:'access_customer',
    }
  };