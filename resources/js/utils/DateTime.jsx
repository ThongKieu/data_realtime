import { format, parseISO } from 'date-fns';
const today = new Date(); // Lấy ngày hôm nay
export const formattedDate = format(today, 'dd/MM/yyyy'); // Định dạng ngày tháng năm

// Hoặc nếu bạn có một chuỗi ngày tháng năm, bạn có thể chuyển đổi nó thành đối tượng ngày:
const dateString = '2023-10-04';
const parsedDate = parseISO(dateString);
const formattedParsedDate = format(parsedDate, 'dd/MM/yyyy');