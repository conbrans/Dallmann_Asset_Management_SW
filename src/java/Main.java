package java;

import java.util.Date;

public class Main
{
    public static void main (String[] args){
        try
        {
            Rent rent = new Rent(1,1,"brans","2020-04-22", "2120-04-23");
            int[] data = {1,2,3,4,5};
            Date firstDay = new Date(2020,4,21);
            Date lastDay = new Date(2020,4,25);
            rent.bookDevice(data,firstDay,lastDay);
            EntryErrors errors = Entry.checkForNegativeID(-1);
            EntryErrors errors1 = Entry.checkForIdIsTOBIG(1100,1000);
            String onlyText= "ABC1D";
            String onlyNumber ="123e4";
            String datum = "2020/22-04";
            EntryErrors errors2 = Entry.checkForOnlyTextAllowed(onlyText);
            EntryErrors errors3 = Entry.checkForOnlyNumbersAllowed(onlyNumber);
            EntryErrors errors4 = Entry.checkForCorrectDateFormat(datum);


            System.out.println(errors);
            System.out.println(errors1);
            System.out.println(errors2);
            System.out.println(errors3);
            System.out.println(errors4);
        }catch (Exception e)
        {
            e.printStackTrace();
        }

    }
}
