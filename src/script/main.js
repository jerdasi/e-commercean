import '../components/app-bar';

function main() {
    const fetchAllProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const responseJson = await response.json();
            console.log(responseJson);
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }


    const renderAllProduct = () => {
        console.log("rendered")
    }

    renderAllProduct();
    fetchAllProducts();
}

export default main;
