interface IConfig {
    rootPath: string;
    db: string;
    httpPort: number;
    domain: string;
    httpProtocol: string;
    jwtSecret: string;
    baseUrl: string;
    email: {
        host: string,
        port: number,
        user: string,
        pass: string,
        sender: string,
        replyEmail: string,
    };
}

const rootPath = process.cwd();

const Config: IConfig = {
        rootPath,
        httpPort: parseInt(process.env.HTTP_SERVER_PORT, 10),
        jwtSecret: process.env.JWT_SECRET,
        baseUrl: `${process.env.DOMAIN}/api`,
        db: process.env.MONGODB_CONNECTION,
        domain: process.env.DOMAIN,
        httpProtocol: process.env.HTTP_PROTOCOL,
        email: {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            user:  process.env.EMAIL_USERNAME,
            pass:  process.env.EMAIL_PASSWORD,
            sender: process.env.EMAIL_SEND_ADDRESS,
            replyEmail: process.env.EMAIL_REPLY_ADDRESS,
        },
};

export {
    IConfig,
    Config,
};
