import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import readline from "readline";

import Authority from "../models/authority.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const createCityAdmin = async () => {
    try {
        await connectDB();

        console.log("\n==============================");
        console.log("   CREATE CITY ADMIN");
        console.log("==============================\n");

        const name = (
            await askQuestion("Name: ")
        ).trim();

        const employeeId = (
            await askQuestion("Employee ID: ")
        )
            .trim()
            .toUpperCase();

        const phone = (
            await askQuestion("Phone: ")
        ).trim();

        const email = (
            await askQuestion("Email: ")
        )
            .trim()
            .toLowerCase();

        const password = await askQuestion(
            "Password: "
        );

        const city = (
            await askQuestion("City: ")
        ).trim();

        if (
            !name ||
            !employeeId ||
            !phone ||
            !email ||
            !password ||
            !city
        ) {
            console.error(
                "\nAll fields are required."
            );
            process.exit(1);
        }

        if (password.length < 8) {
            console.error(
                "\nPassword must contain at least 8 characters."
            );
            process.exit(1);
        }

        const existingEmployee =
            await Authority.findOne({
                employeeId,
            });

        if (existingEmployee) {
            console.error(
                "\nEmployee ID already exists."
            );
            process.exit(1);
        }

        const existingEmail =
            await Authority.findOne({
                email,
            });

        if (existingEmail) {
            console.error(
                "\nEmail already exists."
            );
            process.exit(1);
        }

        const existingPhone =
            await Authority.findOne({
                phone,
            });

        if (existingPhone) {
            console.error(
                "\nPhone number already exists."
            );
            process.exit(1);
        }

        const passwordHash =
            await bcrypt.hash(password, 12);

        const permissions = {
            viewIssues: true,
            assignIssues: true,
            updateIssues: true,
            resolveIssues: true,
            manageCitizens: true,
            viewAnalytics: true,
            manageUsers: true,
        };

        const cityAdmin =
            await Authority.create({
                name,
                employeeId,
                phone,
                email,
                passwordHash,
                role: "CITY_ADMIN",
                jurisdiction: {
                    city,
                    zones: [],
                    wards: [],
                    pincodeRanges: [],
                },
                permissions,
                isActive: true,
            });

        console.log(
            "\n================================"
        );
        console.log(
            "CITY ADMIN CREATED SUCCESSFULLY"
        );
        console.log(
            "================================"
        );
        console.log(
            `Name       : ${cityAdmin.name}`
        );
        console.log(
            `Employee ID: ${cityAdmin.employeeId}`
        );
        console.log(
            `Email      : ${cityAdmin.email}`
        );
        console.log(
            `Role       : ${cityAdmin.role}`
        );
        console.log(
            `City       : ${cityAdmin.jurisdiction.city}`
        );
        console.log(
            "================================\n"
        );

    } catch (error) {
        console.error(
            "\nFailed to create City Admin:",
            error.message
        );
    } finally {
        rl.close();
        await mongoose.connection.close();
        process.exit(0);
    }
};


createCityAdmin();