import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//funcao para paginas que so podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {


    const cookies = parseCookies(ctx);
    //Redirecionar quando usuario já estiver logado
    if(cookies['@nextauth.token']){
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}