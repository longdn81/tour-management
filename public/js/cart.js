// ve ra danh sach tour
const drawListTour = () => {
    fetch("http://localhost:3000/cart/list-json" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : localStorage.getItem("cart")
    })
        .then(res => res.json()
        .then(data => {
    
            const htmlsArray = data.tour.map((item ,index) => {
                return `
                   <tr>
                        <td>${index + 1}</td>
                        <td> 
                            <img src="${item.image}" alt="${item.info.title}  style=" width=  80px;" />
                        </td>
                        <td><a href="/tours/detail/${item.info.slug}">${item.info.title}</a></td> 
                        <td>${item.price_special.toLocaleString()}đ</td>
                        <td>
                            <input 
                                type="number" 
                                name="quantity"
                                value="${item.quantity}" 
                                min="1" 
                                item-id="${item.tourId}" 
                                style="width : 60px;"
                            />
                        </td>
                        <td>${item.total.toLocaleString()}đ</td>
                        <td>
                            <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
                        </td>
                    </tr> 
                `
            });
    
            const listTour = document.querySelector("[list-tour]");
            listTour.innerHTML = htmlsArray.join("");
    
            //  tổng đơn hàng 
            const totalPrice = data.tour.reduce((sum ,item)  => sum + item.total , 0 );
            const elementTotal = document.querySelector("[total-price]");
            elementTotal.innerHTML = totalPrice.toLocaleString();
    
            deleteItemCart();
            updateQuantityCart();

        }));
}
//end  ve ra danh sach tour


//  xóa sản phẩm
const deleteItemCart = ()=>{
    const listBtnDelete = document.querySelectorAll("[btn-delete]");
    listBtnDelete.forEach(button => {
        button.addEventListener("click" , () => {
            const tourId = button.getAttribute("btn-delete");

            const cart = JSON.parse(localStorage.getItem("cart"));

            const newCart = cart.filter( item => item.tourId != tourId)

            localStorage.setItem("cart" , JSON.stringify(newCart));

            drawListTour();
        })
    })
}
// end  xóa sản phẩm

//  update sản phẩm tro cart
const updateQuantityCart = ()=>{
    const listInputUpdate= document.querySelectorAll("[list-tour] input[item-id]");
    console.log(listInputUpdate);
    listInputUpdate.forEach(input => {
        input.addEventListener("change" , () => {

            const tourId = input.getAttribute("item-id");
            const quantity = parseInt(input.value);

            const cart = JSON.parse(localStorage.getItem("cart"));

            const tourUpdate = cart.find(item => item.tourId == tourId);
            tourUpdate.quantity = quantity ;            

            localStorage.setItem("cart" , JSON.stringify(cart));

            drawListTour();
        })
    })
}
// end update sản phẩm tro cart


// lay data in ra giao dien
drawListTour() ;

// end lay data in ra giao dien

// Dat tour
const formOrder = document.querySelector("[form-order]");
if(formOrder){
    formOrder.addEventListener("submit" , (e) => {
        e.preventDefault() ;
        
        const fullName = e.target.elements.fullName.value ;
        const phone = e.target.elements.phone.value ;
        const note = e.target.elements.note.value ;

        const cart = JSON.parse(localStorage.getItem("cart"));

        const data = {
            info : {
                fullName : fullName ,
                phone : phone ,
                note : note
            },
            cart: cart
        }

        fetch("/order" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.code == 200) {
                    localStorage.removeItem("cart");
                    window.location.href = `/order/success?orderCode=${data.orderCode}`
                }else {
                    alert("Đặt hàng không thành công")
                }
            })
    });
}
// end dat tour

