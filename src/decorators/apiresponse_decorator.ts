
import { Request as NextApiRequest, Response as NextApiResponse } from 'express';
export function responseAPIDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            // Mã logic của API gốc ở đây
            const apiResponse = await originalMethod.call(this, req, res);

            // Wrap response theo định dạng mong muốn ở đây
            const wrappedResponse = {
                success: true,
                data: apiResponse,
                message: 'API executed successfully',
            };

            // Trả về response đã wrap
            res.status(200).json(wrappedResponse);

        } catch (error) {
            // Xử lý lỗi nếu có
            res.status(500).json({
                success: false,
                error: error.message,
                message: 'API execution failed',
            });
        }
    };

    return descriptor;
}