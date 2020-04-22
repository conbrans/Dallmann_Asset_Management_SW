

public class Main
{
    public static void main (String[] args){
        try
        {
            Rent rent = new Rent(1,1,"brans","2020-04-22", "2120-04-23");
            System.out.println(rent.getDuration());
        }catch (Exception e)
        {
            e.printStackTrace();
        }

    }
}
