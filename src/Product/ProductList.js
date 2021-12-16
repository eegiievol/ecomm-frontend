import './product.css';

function ProductList(props){

    return(
        <div className='general'>
            <h5>Product name:</h5> {props.name}
            <h5>Product category:</h5> {props.productCategory}
            <h5>Product price:</h5> {props.price}
        </div>
    )

}

export default ProductList