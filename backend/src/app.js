import express from 'express';
import cors from 'cors'; import helmet from 'helmet'; import morgan from 'morgan'; import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express'; import swaggerJSDoc from 'swagger-jsdoc';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js'; import projectRoutes from './routes/projectRoutes.js'; import publicDataRoutes from './routes/publicDataRoutes.js';
import { notFound,errorHandler } from './middleware/error.js';

const app=express(); app.use(helmet()); app.use(cors({origin(origin, callback){ if(!origin || env.clientOrigins.includes(origin)) return callback(null, true); return callback(new Error('CORS origin not allowed')); }})); app.use(express.json({limit:'1mb'})); app.use(express.urlencoded({extended:true})); app.use(morgan('dev'));
app.use('/api/v1/auth',rateLimit({windowMs:15*60*1000,max:100}),authRoutes); app.use('/api/v1/projects',projectRoutes); app.use('/api/v1/data',rateLimit({windowMs:15*60*1000,max:300}),publicDataRoutes);
app.get('/api/v1/health',(req,res)=>res.json({success:true,message:'BaaS API is healthy',data:{service:'Backend-as-a-Service Mini App'}}));
const swagger=swaggerJSDoc({definition:{openapi:'3.0.0',info:{title:'BaaS Mini API',version:'1.0.0',description:'Reusable authentication, project records and file endpoints.'},servers:[{url:env.publicApiUrl}],components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer',bearerFormat:'JWT'},apiKey:{type:'apiKey',in:'header',name:'X-API-Key'}}}},apis:[]});
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swagger)); app.use(notFound); app.use(errorHandler); export default app;
