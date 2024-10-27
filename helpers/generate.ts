// Generate ma ddonw hang

export const generateOrderCode = (number : number) : string => {
    const code = `OD${String(number).padStart(8 ,'0')}`;

    // .padStart(8 ,'0')  : them ki tu vao dau chuoi '0' sao cho chuoi co chieu dai 8

    return code ;
}