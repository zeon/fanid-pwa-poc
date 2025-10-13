import QRCode from 'qrcode';

/**
 * QR Code Data Structure: username,phone_number,ticket_order_uuid
 * Example: "john_doe,+1234567890,550e8400-e29b-41d4-a716-446655440000"
 */

export interface QRCodeData {
  username: string;
  phoneNumber: string;
  ticketOrderId: string;
}

/**
 * Generate QR code data string in CSV format
 */
export const generateQRCodeData = (data: QRCodeData): string => {
  const { username, phoneNumber, ticketOrderId } = data;
  
  // Validate inputs
  if (!username || !phoneNumber || !ticketOrderId) {
    throw new Error('Missing required QR code data fields');
  }
  
  // Format: username,phone_number,ticket_order_uuid
  return `${username},${phoneNumber},${ticketOrderId}`;
};

/**
 * Parse QR code data string back to object
 */
export const parseQRCodeData = (qrString: string): QRCodeData | null => {
  try {
    const parts = qrString.split(',');
    
    if (parts.length !== 3) {
      return null;
    }
    
    const [username, phoneNumber, ticketOrderId] = parts;
    
    // Validate UUID format
    if (!isValidUUID(ticketOrderId)) {
      return null;
    }
    
    return {
      username: username.trim(),
      phoneNumber: phoneNumber.trim(),
      ticketOrderId: ticketOrderId.trim(),
    };
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return null;
  }
};

/**
 * Generate QR code image as Data URL
 */
export const generateQRCodeImage = async (data: QRCodeData): Promise<string> => {
  const qrString = generateQRCodeData(data);
  
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(qrString, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H', // High error correction for better scanning
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Validate UUID format
 */
const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Validate QR code data format
 */
export const isValidQRCodeData = (qrString: string): boolean => {
  const parsed = parseQRCodeData(qrString);
  return parsed !== null;
};
