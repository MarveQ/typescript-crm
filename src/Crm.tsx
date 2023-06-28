import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #6b88fe 30%, #53b2ff 90%)",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(105, 165, 255, 0.3)",
    color: "white",
    height: 48,
    padding: "0 30",
})

const Crm: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(() => {
        const storedCustomers = localStorage.getItem("customers");
        return storedCustomers ? JSON.parse(storedCustomers) : [];
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editActive, setEditActive] = useState(false);
    const [editId, setEdiId] = useState<number>();

    const saveAndClear = () => {
        setEdiId(0);
        setName('');
        setEmail('');
        setPhone('');
        localStorage.setItem("customers", JSON.stringify(customers));
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleAddCustomer = () => {
        if (name === "" || email === "" || phone === "") return
        const newCustomer: Customer = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
        };
        setCustomers([...customers, newCustomer]);
        saveAndClear();
    }
    const handleDeleteCustomer = (customerId: number) => {
        const update = customers.filter(item => item.id !== customerId)
        setCustomers(update);
        saveAndClear();
    }
    const handleEditCustomer = (customerId: number) => {
        const findCustomer = customers.find(item => item.id === customerId);
        if (findCustomer) {
            setEdiId(findCustomer.id);
            setName(findCustomer.name);
            setEmail(findCustomer.email);
            setPhone(findCustomer.phone);
            setEditActive(true);
        }
    }

    const handleSaveEditCustomer = () => {
        const saveEdit = customers.map(item => item.id === editId ? {
            ...item,
            name: name,
            email: email,
            phone: phone
        } : item)
        setCustomers(saveEdit);
        setEditActive(false);
        saveAndClear();
    }

    return (
        <Container>
            <Typography variant="h4">
                CRM
            </Typography>
            {/*SlideBar opens here*/}

            <form style={{display: "block", marginBottom: "15px"}}>
                <TextField sx={{width: {md: 800}}} label="Name" value={name} onChange={handleNameChange}
                           margin="normal"/>
                <TextField sx={{width: {md: 800}}} label="Email" value={email} onChange={handleEmailChange}
                           margin="normal"/>
                <TextField sx={{width: {md: 800}}} label="Phone" value={phone} onChange={handlePhoneChange}
                           margin="normal"/>
            </form>

            <div style={{margin: "25px"}}>
                {editActive ? <MyButton onClick={handleSaveEditCustomer}>Save Edit</MyButton> :
                    <MyButton onClick={handleAddCustomer}>Add Customer</MyButton>}
            </div>


            {customers.length > 0 && <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((item) => (
                            <TableRow
                                key={item.id}
                            >
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell><Button onClick={() => handleEditCustomer(item.id)}>EDIT</Button></TableCell>
                                <TableCell><Button onClick={() => handleDeleteCustomer(item.id)}>DELETE</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </Container>
    );
};

export default Crm;