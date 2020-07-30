package java;

import java.util.regex.Pattern;

public class Entry
{

    public static EntryErrors checkForNegativeID(int id)
    {
        if(id<=0)
        {
            return EntryErrors.NEGATIVEID;
        }else
            {
                return EntryErrors.CORRECTENTRY;
            }
    }

    public static EntryErrors checkForIdIsTOBIG(int id, int maxlenght)
    {
        if(id>maxlenght)
        {
            return EntryErrors.IDISTOLONG;
        }else
            {
                return EntryErrors.CORRECTENTRY;
            }

    }

    public static EntryErrors checkForOnlyNumbersAllowed(String stringtoCheck)
    {
        if(Pattern.matches("\\d*",stringtoCheck))
        {
            return EntryErrors.CORRECTENTRY;
        }else
            {
                return EntryErrors.ONLYNUMBERSALLOWED;
            }
    }

    public static EntryErrors checkForOnlyTextAllowed(String stringtoCheck)
    {
        if(Pattern.matches("\\D*",stringtoCheck))
        {
            return EntryErrors.CORRECTENTRY;
        }else
        {
            return EntryErrors.ONLYTEXTALLOWED;
        }
    }

    public static EntryErrors checkForCorrectDateFormat(String dateString)
    {
        String[] split = dateString.split("-");

        if(split[0].length()==4 &&
                split[1].length()==2 &&
                split[2].length()==2)
        {
            if(     Pattern.matches("\\d*",split[0]) &&
                    Pattern.matches("\\d*",split[1]) &&
                    Pattern.matches("\\d*",split[0]))
            {
                return EntryErrors.CORRECTENTRY;
            }else
                {
                    return EntryErrors.INCORRECTDATEFORMAT;
                }
        }else
            {
                return EntryErrors.INCORRECTDATEFORMAT;
            }
    }



}
