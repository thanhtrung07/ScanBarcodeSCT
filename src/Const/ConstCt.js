export const SHOPS = [
    { _id: 1, from: "Shopee", name: 'Shop Chiến Thắng' },
    { _id: 2, from: "Shopee", name: 'Dụng Cụ Làm Bếp az' },
    { _id: 3, from: 'Shopee', name: 'DAO PHÚC SEN THẮNG' },
    { _id: 4, from: 'Shopee', name: 'Mỹ Phẩm Xách Tay 59' },
    { _id: 5, from: 'Lazada', name: 'Dụng Cụ Bếp Chuyên Nghiệp' },
    { _id: 6, from: 'Lazada', name: 'Muôn màu cuộc sống' },
    { _id: 7, from: 'Lazada', name: 'VẺ ĐẸP CUỘC SỐNG' },
    { _id: 8, from: 'Lazada', name: 'Mỹ Phẩm Xách Tay' },
    { _id: 9, from: 'Lazada', name: 'Tổng Kho Phân Phối Hàng Hóa Miền Bắc' },
    { _id: 10, from: 'Lazada', name: 'Siêu Thị CT' },
    { _id: 11, from: 'Lazada', name: 'Siêu Thị Miền Bắc' },
    { _id: 12, from: 'Lazada', name: 'Siêu Thị Thép Số Một Việt Nam' },
    { _id: 13, from: 'Lazada', name: 'Shop Chien Thang87' },
    { _id: 14, from: 'Lazada', name: 'Cửa Hàng Chăm Sóc Gia Đình' },
    { _id: 15, from: 'Tiki', name: 'Tiki' },
    { _id: 16, from: "Other", name: 'Shop khác' },
    { _id: 17, from: "Shopee", name: 'StrongerManShop' },
]
export const ECOM = ['Shopee', 'Lazada', 'Tiki', 'Other'];
export const ORDER_STATUS = [
    'Chưa kiểm tra',
    'Đã kiểm tra',
    'Chờ',
    'Đồng bộ, đã kiểm tra',
    'Không tìm ra',
    'Đơn đổi trả',
    'Kỳ quặc'
]
export const ORDER_MODEL = [
    { shop: null, orderCode: "123456789012345", shippingCode: "BEST0013214567VNA", dateCreate: new Date('1/5/2022'), status: ORDER_STATUS[0], dateRecord: new Date(), },
    { shop: null, orderCode: "321456789012345", shippingCode: "JNT0013214567VNA", dateCreate: new Date('1/10/2022'), status: ORDER_STATUS[1], dateRecord: new Date(), },
    { shop: null, orderCode: "999456789012345", shippingCode: "GHN0013214567VNA", dateCreate: new Date('12/25/2021'), status: ORDER_STATUS[2], dateRecord: new Date(), },
]
export const ORDER_FIELD = ['shop', 'orderCode', 'shippingCode', 'dateCreate', 'status', 'dateRecord',]
export const SILVEDARK_LINEARS = ['#F7F7F7', '#CCCCCC', '#6D6D6D'];
export const FORM_MODE1 = 'Modify';
export const LAZADA_TRANSPORT_MARK = 'VNA';
export const QR_FORMAT = 'QR_CODE';
export const CODE128_FORMAT = 'CODE_128'